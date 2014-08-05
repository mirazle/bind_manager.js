# ○ Introduction

jQuery bind func mapping plugin.
You can .. 
- Collective management that some bind code.
- Group on(), off().
- Prevent unnecessary multiple bind and memory saving
- See bind structure in dev tool. 

# ○ Usage

##HTML
```html
<div id='element1'>
	<div class='elements'></div>
	<div class='elements'></div>
</div>
<div id='element2'>
	<div class='elements'></div>
	<div class='elements'></div>
</div>
```
##API

### Ⅰ $.bm.define()
```html
$.bm.define({
		'group_name1': {
			'#element1' :{ 'tap': function(){} },
			'.elements' :{ 'mouseover': function(){} }
                },
		'group_name2': {
			'#element2' :{ 'tap': function(){} },
			'.elements' :{ 'mouseover': function(){} }
                }
});
```

### Ⅱ $.bm.on()
```html
  $.bm.on( 'group_name1');
```
```html
  $.bm.on( {'group_name1': {
                          '#element1' :{ 'tap': function(){} }},
                          '.elements' :{ 'mouseover': function(){} }}
                          }
              } );
```
### Ⅲ $.bm.off()
```html
  $.bm.off( 'group_name1');
```
```html
  $.bm.off( {'group_name1': {
                          '#element1' : 'tap',
                          '.elements' : 'mouseover'
                          }
              } );
```
```html
  $.bm.off( {'group_name1': {
                          '#element1' :{ 'tap': function(){} }},
                          '.elements' :{ 'mouseover': function(){} }}
                          }
              } );
```
### Ⅳ $.bm.map()
You can see bind structure in dev tool.
```html
Object {group_name1: Object}
	'group_name1': Object
		#element1: Object
      			tap: Object
        			fn: function (){}
        			status: "off"
      			mouseover: Object
        			fn: function (){}
				status: "on"
		.element: Object
			tap: Object
				fn: function (){}
				status: "off"
			mouseover: Object
				fn: function (){}
				status: "off"
Object {group_name2: Object}
			.
			.
```

