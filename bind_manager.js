$(function(){

    // Define Base Function
    var bind_manager  = new Function;
	
    // Extend Protptype Base Plugin
    $.extend( bind_manager.prototype, {
	map:{},
        define :function( request ){
	    return exe_common( this, 'define', request );
        },
        on :function( request ){
	    return exe_common( this, 'on', request );
        },
        off :function( request ){
	    return exe_common( this, 'off', request );
        },
        is_on :function( request ){
	    return exe_common( this, 'is_on', request );
        },
	// http://qiita.com/HamaTech/items/7819abacfaefc21405f3
	hammer_triggers: ['tap', 'doubletap', 'pan', 'swipe', 'press', 'pinch', 'rotate'],
	is_hammer_trigger: function( trigger ){
	    for( i = 0; i <= this.hammer_triggers.length ; i++ ){
	        if( this.hammer_triggers[ i ] ) return true;
	    }
	    return false;
	}
    });

    // Common Execute Function
    function exe_common( _t, method, request ){

	// Define Result Response Object
        var response	= {};
	
	// Get Map_pieces To Map
	var map_pieces	= get_map_pieces( _t, method, request );

	// Loop Any Group_names Params
        for( group_index = 0; group_index < Object.keys( map_pieces ).length; group_index++ ){

	    var group_name  = Object.keys( map_pieces )[ group_index ];;
        
	    // Loop Any Element Params
	    for( element_index = 0; element_index < Object.keys( map_pieces[ group_name ] ).length; element_index++ ){
	    
		var element	= Object.keys( map_pieces[ group_name ])[ element_index ];

		// Loop Any Element Params
		for( trigger_index = 0; trigger_index < Object.keys( map_pieces[ group_name ][ element ] ).length; trigger_index++ ){

		    var trigger	    = Object.keys( map_pieces[ group_name ][ element ])[ trigger_index ];
		    var bind_func   = function(){};

		    // Bind type group_name ( based _this.map[ request ] )
		    if( typeof( map_pieces[ group_name ][ element ][ trigger ] ) == 'object' ){
			bind_func	= map_pieces[ group_name ][ element ][ trigger ]['fn'];
		    
		    // Bind type single ( based {group_name:{element:{trigger:function}}} )
		    }else if( typeof( map_pieces[ group_name ][ element ][ trigger ] ) == 'function' ){
			bind_func	= map_pieces[ group_name ][ element ][ trigger ];
		    }

		    // Set Response Boolean
		    response[ group_name ]  = false;

		    // Validate Any Params
		    if( element != undefined && trigger != undefined && bind_func != undefined ){
		
			switch( method ){
			case 'on':
		    
			    // if Already binded
			    if( is_on( element, trigger ) === true ) off( _t, element, trigger );

			    // jQuery On Function
			    on( _t, element, trigger, bind_func );

			    // Set Response
			    response[ group_name ] = save_map( _t, method, group_name, element, trigger, bind_func );
			    
			    break;
			case 'off':

			    // jQuery Off Function
			    if( is_on( element, trigger ) === true ) off( _t, element, trigger );
		        
			    // Set Response
			    response[ group_name ] = save_map( _t, method, group_name, element, trigger, bind_func );
			    break;
			case 'define':
			   
			    var method	= 'off';

			    // Set Response
			    response[ group_name ] = save_map( _t, method, group_name, element, trigger, bind_func );
			    break;
			case 'is_on':
		    
			    // Set Response
			    response[ group_name ] = is_on( element, trigger );
			    break;
			}
		    }
		}
	    }
	}
	   
	// Return Response
	return response;
    }
   
    function get_map_pieces( _t, method, request ){
	
	var map_pieces	= {};
	
	if( typeof( request ) == 'string' && _t.map[ request ] != undefined ){
	    
	    map_pieces[ request ]	= _t.map[ request ];
	
	}else if( typeof( request ) == 'object' ){
	    
	    map_pieces	= request;
	}else{
	    throw request + " is not a group_name( String ) or Object. this type is " + typeof( request );
	} 

	return map_pieces;
    }

    function on( _t, element, trigger, bind_func ){		
	if( _t.is_hammer_trigger( trigger ) ){
	    $( element ).hammer().on( trigger, bind_func );
	}else{
	    $( element ).on( trigger, bind_func );
	} 
    }

    function off( _t, element, trigger ){		
			    
	$( element ).unbind( trigger );
	
	if( _t.is_hammer_trigger( trigger ) ){
	    $( element ).hammer().off( trigger );
        }else{
	    $( element ).off( trigger );
	}
    }

    function save_map( _t, method, group_name, element, trigger, bind_func ){

	// Allocate Memory Space in Map
	if( _t.map[ group_name ]		        == undefined ) _t.map[ group_name ]			    = {};
	if( _t.map[ group_name ][ element ]	        == undefined ) _t.map[ group_name ][ element ]		    = {};
        if( _t.map[ group_name ][ element ][ trigger ]	== undefined ) _t.map[ group_name ][ element ][ trigger ]   = {};

	// Save Map 
	_t.map[ group_name ][ element ][ trigger ]['status']	= method;
	_t.map[ group_name ][ element ][ trigger ]['fn']	= bind_func;

        return true; 
    }

    function is_on( element, trigger ){
	if( $( element ).get( 0 ) == undefined )				    return false;
	if( ( $._data( $( element ).get( 0 ) ).events ) == undefined )		    return false;
        return ( $._data( $( element ).get( 0 ) ).events[ trigger ] == undefined )? false : true ;
    }

    $.extend({
        bm: new bind_manager()
    });
});
