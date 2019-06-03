//This is an ACT Plugin - The rule is: If the setting can be applied to ANY HTML element in the document, then it should be in ACT Panel.

$(function() {

    //Wait for Pinegrow to wake-up
    $('body').one('pinegrow-ready', function(e, pinegrow) {

        //Create new Pinegrow framework object
        var f = new PgFramework('animateIt', 'pgAnimateIt'); //give the plugin a name - The Second Part will Show in the Lib Manager and Action Panel as Name

        //This will prevent activating multiple versions of the framework, provided that other versions set the same type
        f.type = "animateIt";
        f.allow_single_type = true;

        f.description = '<a href="http://jackonthe.net/css3animateit/">CSS3 Animate It for Pinegrow</a> - Because static content is boring!'; // Give the Plugin a description
        f.author = 'Ben Hanna'; //Who Made the Plugin
        f.author_link = 'https://pluginsforpinegrow.com/'; //Link to the Authors Website

        f.not_main_types = true; //comps will not be used in getType()
        f.has_actions = true; //Does it Have actions for the action panel?

        //Don't show these files in CSS tab - When a user clicks on an element the can't edit CSS in Pinegrow
        f.ignore_css_files = [		
		 /(^|\/)animations\.(css|less)/i, /(^|\/)animations-ie-fix\.min\.(css|less)/i
		];

        //Auto detect plugin. It can also be manually added / removed from a page with Framework Manager
        f.detect = function(pgPage) {
            return pgPage.hasScript(/(^|\/)pg.animateIt.*\.js/i);
        }

        //get url if script is included directly into edit.html
        f.setScriptFileByScriptTagId('pg-animateIt');

        var animateit_actions = []; // Will be shown in ACT tab 

        //Tell Pinegrow about the framework
        pinegrow.addFramework(f);

		//Add properties common to all components of this framework	
        // Add Animation Parent Properties that are arranged in sections
		var animateIt_parent = new PgComponentType('animateItParentAction', 'Set Animation Parent'); //This is the name of the action that will appear in the Actions panel
				animateIt_parent.selector = "[animated]";//This makes the option appear for the action 
				animateIt_parent.attribute = 'animated';//This is the name of the action that will appear in the Actions panel
				animateIt_parent.action = true; //Is It an Action?
				animateIt_parent.not_main_type = true;  //Is it A Main Type?
				animateIt_parent.sections = {
					'animateIt.parent.parameters' : {
						'name' : 'Animation Parent Options',
						'fields' : {
							
							//TEXT
							'animateIt.parent.dataSequence': {
								// The property type
								'type' : 'text', // The Field Type - Here it is a text field
								'name' : 'Sequencing', //The name of the option of the action 
								'action' : 'element_attribute', //the action type - Here its an Atrribute
								'attribute' : 'data-sequence', 	//set the HTML attribute name
								'attribute_keep_if_empty' : true // Display if Empty?
							},
							
							//TEXT
							'animateIt.parent.offSet': {
								// The property type
								'type' : 'text', // The Field Type - Here it is a text field
								'name' : 'Offset', //The name of the option of the action 
								'action' : 'element_attribute', //the action type - Here its an Atrribute
								'attribute' : 'data-appear-top-offset', 	//set the HTML attribute name
								'attribute_keep_if_empty' : true // Display if Empty?
							},
							
							
							// LETS ADD MORE OPTIONS
							
							//CHECKBOX
							'animateIt.parent.animateOnce' : {
								type: 'checkbox', //The Field Type - Here it is a Checkbox field
								name: 'Animate Once?', //The name of the option of the action 
								action: 'apply_class', //the action type - Here it will apply a class
								value: 'animateOnce' //The Value or Name of the Class
							}
	
						}
					}
				};
			
			//WHAT IF WE WANT TO ADD A CLASS AS SOON AS THE ACTION IS CLICKED
			animateIt_parent.on_action_added = function(pgel, cp, action_def, $el) {
                pgel.addClass('animatedParent'); //ADD THIS CLASS WHEN CHECKED
            };
			
            animateIt_parent.on_action_removed = function(pgel, cp, action_def, $el) {
				pgel.removeClass('animatedParent'); //REMOVE THIS CLASS WHEN UNCHECKED
            };
                
			animateit_actions.push(animateIt_parent); // Should be the Same Name of VAR
			
			 // Add Animation Parent Properties that are arranged in sections
				var animateIt_child = new PgComponentType('animateItChildAction', 'Animate an Element'); //This is the name of the action that will appear in the Actions panel
				animateIt_child.selector = "[animated]";//This makes the option appear for the action 
				animateIt_child.attribute = 'animated';//This is the name of the action that will appear in the Actions panel
				animateIt_child.action = true; //Is It an Action?
				animateIt_child.not_main_type = true;  //Is it A Main Type?
				animateIt_child.sections = {
					'animateIt.child.parameters' : {
						'name' : 'Animation Parent Options',
						'fields' : {
						
							//SET ANIMATION TYPE
							'animateIt.child.animation' : {
								type: 'select',
								name: 'Animation Type',
								'action' : 'apply_class',
								show_empty: true,
								'show_empty' : true,
								'options' : [
									{'key' : 'bounceIn', 'name' : 'bounceIn'},
									{'key' : 'bounceInDown', 'name' : 'bounceInDown'},
									{'key' : 'bounceInRight', 'name' : 'bounceInRight'},
									{'key' : 'bounceInUp', 'name' : 'bounceInUp'},
									{'key' : 'bounceInLeft', 'name' : 'bounceInLeft'},
									{'key' : 'fadeInDownShort', 'name' : 'fadeInDownShort'},
									{'key' : 'fadeInUpShort', 'name' : 'fadeInUpShort'},
									{'key' : 'fadeInLeftShort', 'name' : 'fadeInLeftShort'},
									{'key' : 'fadeInRightShort', 'name' : 'fadeInRightShort'},
									{'key' : 'fadeInDown', 'name' : 'fadeInDown'},
									{'key' : 'fadeInUp', 'name' : 'fadeInUp'},
									{'key' : 'fadeInLeft', 'name' : 'fadeInLeft'},
									{'key' : 'fadeInRight', 'name' : 'fadeInRight'},
									{'key' : 'fadeIn', 'name' : 'fadeIn'},
									{'key' : 'growIn', 'name' : 'growIn'},
									{'key' : 'shake', 'name' : 'shake'},
									{'key' : 'shakeUp', 'name' : 'shakeUp'},
									{'key' : 'rotateIn', 'name' : 'rotateIn'},
									{'key' : 'rotateInUpLeft', 'name' : 'rotateInUpLeft'},
									{'key' : 'rotateInDownLeft', 'name' : 'rotateInDownLeft'},
									{'key' : 'rotateInUpRight', 'name' : 'rotateInUpRight'},
									{'key' : 'rollIn', 'name' : 'rollIn'},
									{'key' : 'wiggle', 'name' : 'wiggle'},
									{'key' : 'swing', 'name' : 'swing'},
									{'key' : 'tada', 'name' : 'tada'},
									{'key' : 'wobble', 'name' : 'wobble'},
									{'key' : 'pulse', 'name' : 'pulse'},
									{'key' : 'lightSpeedInRight', 'name' : 'lightSpeedInRight'},
									{'key' : 'lightSpeedInLeft', 'name' : 'lightSpeedInLeft'},
									{'key' : 'flip', 'name' : 'flip'},
									{'key' : 'flipInX', 'name' : 'flipInX'},
									{'key' : 'flipInY', 'name' : 'flipInY'}
								]
							},
							
							//SET ANIMATION SPEED
							'animateIt.child.speed' : {
								type: 'select',
								name: 'Animation Speed',
								'action' : 'apply_class',
								show_empty: true,
								'show_empty' : true,
								'options' : [
									{'key' : 'slow', 'name' : 'slow'},
									{'key' : 'slower', 'name' : 'slower'},
									{'key' : 'slowest', 'name' : 'slowest'}
								]
							},
							
							//SET ANIMATION DELAY
							'animateIt.child.delay' : {
								type: 'select',
								name: 'Delay',
								'action' : 'apply_class',
								show_empty: true,
								'show_empty' : true,
								'options' : [
									{'key' : 'delay-250', 'name' : 'delay-250'},
									{'key' : 'delay-500', 'name' : 'delay-500'},
									{'key' : 'delay-750', 'name' : 'delay-750'},
									{'key' : 'delay-1000', 'name' : 'delay-1000'},
									{'key' : 'delay-1250', 'name' : 'delay-1250'},
									{'key' : 'delay-1500', 'name' : 'delay-1500'},
									{'key' : 'delay-1750', 'name' : 'delay-1750'},
									{'key' : 'delay-2000', 'name' : 'delay-2000'},
									{'key' : 'delay-2500', 'name' : 'delay-2500'},
									{'key' : 'delay-3000', 'name' : 'delay-3000'},
									{'key' : 'delay-3500', 'name' : 'delay-3500'}
								]
							},
							
							//TOGGLE ON CLICK
							'animateIt.child.onClick' : {
								type: 'checkbox', //The Field Type - Here it is a Checkbox field
								name: 'On Click Toggle', //The name of the option of the action 
								action: 'apply_class', //the action type - Here it will apply a class
								value: 'animatedClick' //The Value or Name of the Class
							},
							
							//On Click Target
							'animateIt.child.onClickTargetClass': {
								// The property type
								'type' : 'text', // The Field Type - Here it is a text field
								'name' : 'Animate On Click', //The name of the option of the action 
								'action' : 'element_attribute', //the action type - Here its an Atrribute
								'attribute' : 'data-target', 	//set the HTML attribute name
								'attribute_keep_if_empty' : true // Display if Empty?
							},
							
							//On Click SEQUENCING
							'animateIt.child.onClickSequence': {
								// The property type
								'type' : 'text', // The Field Type - Here it is a text field
								'name' : 'On Click With Sequencing', //The name of the option of the action 
								'action' : 'element_attribute', //the action type - Here its an Atrribute
								'attribute' : 'data-sequence', 	//set the HTML attribute name
								'attribute_keep_if_empty' : true // Display if Empty?
							},
							
							//Data ID
							'animateIt.child.onDataID': {
								// The property type
								'type' : 'text', // The Field Type - Here it is a text field
								'name' : 'Set Data ID', //The name of the option of the action 
								'action' : 'element_attribute', //the action type - Here its an Atrribute
								'attribute' : 'data-id', 	//set the HTML attribute name
								'attribute_keep_if_empty' : true // Display if Empty?
							}
	
						}
					}
				};
			
			//WHAT IF WE WANT TO ADD A CLASS AS SOON AS THE ACTION IS CLICKED
			animateIt_child.on_action_added = function(pgel, cp, action_def, $el) {
                pgel.addClass('animated'); //ADD THIS CLASS WHEN CHECKED
            };
			
            animateIt_child.on_action_removed = function(pgel, cp, action_def, $el) {
				pgel.removeClass('animated'); //REMOVE THIS CLASS WHEN UNCHECKED
            };
                
			animateit_actions.push(animateIt_child); // Should be the Same Name of VAR

		//Important Loop To Add Components To Pinegrow
        var addComponentTypesToPG = function(list) {
            for(var i = 0; i < list.length; i++) {
                f.addComponentType(list[i]);
            }
        }

     //Add Component Type   
	 addComponentTypesToPG(animateit_actions); 
	 //Adds the New Component Type To Pinegrow


        //Now, lets define sections and elements shown in LIB tab
        section = new PgFrameworkLibSection('animateItAction', 'AnimateIt Options');

        section.setComponentTypes( animateit_actions ); //Set the component type USE THE NAME OF ADD COMPONENT TYPE
		
        section.closed = true; // Does it Need to be Clicked to be Opened?
		
        f.addActionsSection(section); //Add Actions Section To Pinegrow

        //Register starting page template
       // f.addTemplateProjectFromResourceFolder('template', null, 6);
	   
	    //ADD THE PLUGIN RESOURCES
		var toLocalPath = function(p) {
        return p.replace(/\//g, path.sep);
		}
	
		var res_files = [ 'css/animations-ie-fix.css', 'css/animations.css', 'js/css3-animate-it.js'];
		for(var i = 0; i < res_files.length; i++) {
			var file = f.getResourceFile('template/' + res_files[i]);
			var r = new PgComponentTypeResource(file);
			r.relative_url = res_files[i];
			r.source = toLocalPath(file);
			r.footer = res_files[i].indexOf('.js') >= 0;
			f.resources.add(r);
		}
		
		f.resources.description = "CSS and JS files needed for Pinegrow AnimateIt to work";
    });
});