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
Defined status is 'off' in $.bm.map()
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
Group bind
```html
  $.bm.on( 'group_name1');
```
Any function bind and override
```html
  $.bm.on( {'group_name1': {
                          '#element1' :{ 'tap': function(){} }},
                          '.elements' :{ 'mouseover': function(){} }}
                          }
              } );
```
### Ⅲ $.bm.off()
Group unbind
```html
  $.bm.off( 'group_name1');
```
Any function unbind
```html
  $.bm.off( {'group_name1': {
                          '#element1' : 'tap',
                          '.elements' : 'mouseover'
                          }
              } );
```
Any function unbind and define
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
# ○ Other
MIT License
 Copyright (C) 2014 mirazle

