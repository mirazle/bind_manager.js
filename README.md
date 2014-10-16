# ○ Introduction

jQuery bind func mapping plugin.
You can .. 
- Collective management that some bind code.
- Group on(), off().
- Prevent unnecessary double bind and memory saving
- See bind tree structure in dev tool. 

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
Collective management that some bind code, and
Defined status is 'off' in $.bm.map().

```javascript
$.bm.define({
		'group_name1': {
			'#element1' :{ 'touchstart mousedown': function(){} },
			'.elements' :{ 'touchend mouseup': function(){} }
                },
		'group_name2': {
			'#element2' :{ 'touchstart mousedown': function(){} },
			'.elements' :{ 'touchend mouseup': function(){} }
                }
});
```

### Ⅱ $.bm.on()
Group on ( bind )
```javascript
  $.bm.on( 'group_name1');
```
Any function bind and override
```javascript
  $.bm.on( {'group_name1': {
                          '#element1' :{ 'touchstart mousedown': function(){} }},
                          '.elements' :{ 'touchend mouseup': function(){} }}
                          }
              } );
```
### Ⅲ $.bm.off()
Group off ( unbind )
```javascript
  $.bm.off( 'group_name1');
```
Any function off ( unbind )
```html
  $.bm.off( {'group_name1': {
                          '#element1' : 'tap',
                          '.elements' : 'mouseover'
                          }
              } );
```
Any function off ( unbind ) and define
```javascript
  $.bm.off( {'group_name1': {
                          '#element1' :{ 'touchstart mousedown': function(){} }},
                          '.elements' :{ 'touchend mouseup': function(){} }}
                          }
              } );
```
### Ⅳ $.bm.map()
You can see bind structure in dev tool.
```javascript
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
# ○ License

MIT License Copyright (C) 2014 mirazle

