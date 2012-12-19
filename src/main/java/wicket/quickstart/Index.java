package wicket.quickstart;

//import java.awt.List;
import java.util.Arrays;

import wicket.ajax.AjaxRequestTarget;
import wicket.ajax.markup.html.form.AjaxSubmitLink;
import wicket.markup.html.basic.Label;
import wicket.markup.html.form.DropDownChoice;
import wicket.markup.html.form.Form;
import wicket.markup.html.form.TextField;
import wicket.model.PropertyModel;
import wicket.PageParameters;

/**
 * Basic bookmarkable index page.
 * 
 * NOTE: You can get session properties from QuickStartSession via getQuickStartSession()
 */
public class Index extends QuickStartPage 
{
    // TODO Add any page properties or variables here

	/**
	 * 
	 */
	private static final long serialVersionUID = 4799925874337581496L;
	/**
	 * Constructor that is invoked when page is invoked without a session.
	 * 
	 * @param parameters
	 *            Page parameters
	 */
	String l;
	Label y, character;
	TextField n, t;
	DropDownChoice avatarChoice;
	LabelPropertyModel labelModel;
	
	public Index(final PageParameters parameters) 
    {	
		Player player = ((QuickStartSession) getSession()).player;
		
		
	//	labelModel = new LabelPropertyModel();
	//	labelModel.setLabel("0");
		
	//	y = new Label("label", new PropertyModel(labelModel, "label")); 
	//	y.setOutputMarkupId(true);
	//	add(y);
	
	//	character = new Label("characterLabel", new PropertyModel((QuickStartSession) getSession(), "character"));
	//	add(character);
		
		Form form = new Form("form");
		n = new TextField("nameField", new PropertyModel(player, "name"));
		avatarChoice = new DropDownChoice("avatarChoice", new PropertyModel(player, "avatar"), Arrays.asList(new String[]{"1", "2", "3"}));
		//nameChoice = new DropDownChoice("nameChoice", new PropertyModel(player, "character"), Arrays.asList(Character.values()));
		//n = new TextField("nameField", new PropertyModel(player, "name"));
		//t = new TextField("locationField", new PropertyModel(player, "location")); 		
		form.add(n);
		form.add(avatarChoice);
		//form.add(n);
		//form.add(t);
		
		form.add(new AjaxSubmitLink("submitLink", form){
			/**
			 * 
			 */
			private static final long serialVersionUID = -799856289915753243L;

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form form){				
				setResponsePage(MapOverview.class);
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form form) {
				// TODO Auto-generated method stub
				
			}
		});
		
		add(form);
	}
	
}
