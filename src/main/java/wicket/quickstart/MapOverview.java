package main.java.wicket.quickstart;

import java.awt.List;
import java.util.Vector;

import wicket.ajax.AbstractDefaultAjaxBehavior;
import wicket.ajax.AjaxEventBehavior;
import wicket.ajax.AjaxRequestTarget;
import wicket.ajax.AjaxSelfUpdatingTimerBehavior;
import wicket.ajax.markup.html.form.AjaxSubmitLink;
import wicket.behavior.HeaderContributor;
import wicket.behavior.SimpleAttributeModifier;
import wicket.markup.ComponentTag;
import wicket.markup.html.IHeaderContributor;
import wicket.markup.html.WebMarkupContainer;
import wicket.markup.html.basic.Label;
import wicket.markup.html.form.Button;
import wicket.markup.html.form.Form;
import wicket.markup.html.form.HiddenField;
import wicket.markup.html.form.TextField;
import wicket.markup.html.list.ListItem;
import wicket.markup.html.list.ListView;
import wicket.model.PropertyModel;
import wicket.util.time.Duration;
import wicket.Component;
import wicket.PageParameters;
import wicket.RequestCycle;
import wicket.Response;

/**
 * Basic bookmarkable index page.
 * 
 * NOTE: You can get session properties from QuickStartSession via getQuickStartSession()
 * gFigures -> new Figure(x, y)
 * gSelectedFigureIndex
 * 
 */

public class MapOverview extends QuickStartPage 
{
	
	List javaScriptInstructions;
	Player player;
	Vector<Player> players;
	ListView playerListview;
 
	public MapOverview(final PageParameters parameters) 
    {
		javaScriptInstructions = new List();
		player = ((QuickStartSession) getSession()).player;
		players = ((QuickStartSession) getSession()).players;
		
		//add(HeaderContributor.forJavaScript("MapOverview.js"));
				
		WebMarkupContainer body = new WebMarkupContainer("body");

		AjaxEventBehavior loader = new AjaxEventBehavior("onload") {
		private static final long serialVersionUID = 1L;
			@Override
			protected void onEvent(AjaxRequestTarget target) {
				target.appendJavascript("changeOrAddFigure(\""+ player.name + "\", 1, 1)");
				target.appendJavascript("setMyFigure(\""+ player.name + "\")");
				target.appendJavascript("drawBoard()");
				
				//Vector<Player> players = ((QuickStartSession) getSession()).players;
				//target.appendJavascript("alert(\""+ players.size() + " players\")");
				//changeOrAddFigure("Marieke", 2, 5);
				//changeOrAddFigure("Emile", 3, 6);
			}
		};
		body.add(loader);
		add(body);
		
		//Label nameLabel = new Label("nameLabel", new PropertyModel(player, "name"));
		//Label avatarLabel = new Label("avatarLabel", new PropertyModel(player, "avatar"));
		
		playerListview = new ListView("playerList", players) {
		    protected void populateItem(ListItem item) {
		        //item.add(new Label("player", item.getModel()));
		    	Player p = (Player)item.getModelObject();
		    	item.add(new Label("avatar",  new PropertyModel(p, "avatar")));
		    	item.add(new Label("player",  new PropertyModel(p, "name")));	
		    	if(p.equals(player)){item.add(new SimpleAttributeModifier("style", "font-weight:bold;"));}
		    }
		};
		
		//body.add(nameLabel);
		//body.add(avatarLabel);
		
		WebMarkupContainer playerlistContainer = new WebMarkupContainer("playerlistContainer");
		playerlistContainer.add(playerListview);
		playerlistContainer.setOutputMarkupId(true);
		body.add(playerlistContainer);
		
		//Call-back functie
		final AbstractDefaultAjaxBehavior behavior = new AbstractDefaultAjaxBehavior(){
			@Override
			protected void respond(AjaxRequestTarget arg0) {
				Integer x = Integer.parseInt(RequestCycle.get().getRequest().getParameter("x"));
				Integer y = Integer.parseInt(RequestCycle.get().getRequest().getParameter("y"));
				arg0.appendJavascript("changeOrAddFigure(\"\", " + Math.max(x-1, 0) + ", " +  Math.max(y-1, 0) + ")");
				arg0.appendJavascript("drawBoard()");
				System.err.println(x);
				System.err.println(y);
				//arg0.appendJavascript("alert(fromWicket);");
				//arg0.appendJavascript("fromWicket = '" + x +"';");
				//arg0.appendJavascript("alert(fromWicket);");
				//arg0.appendJavascript("setX('".concat(x).concat("')"));
				//arg0.appendJavascript("alert(fromWicket); setX(" + x + ");");
			}
		};
		
		final AjaxSelfUpdatingTimerBehavior updatingBehavior = new AjaxSelfUpdatingTimerBehavior(Duration.seconds(10)){
			@Override
			protected void onPostProcessTarget(AjaxRequestTarget timerTarget) {
				//timerTarget.add(playerListview);
				timerTarget.appendJavascript("changeOrAddFigure(\"a\", " + Math.round(20 * Math.random()) + ", " + Math.round(20 * Math.random()) + ")");
				timerTarget.appendJavascript("drawBoard()");
                
			}
		};
	
		playerlistContainer.add(behavior);
		playerlistContainer.add(updatingBehavior);

		
		Button commitMoveButton = new Button("commitMoveButton"){
			@Override
			public void onComponentTag(ComponentTag tag){
				tag.put("onClick", "wicketAjaxGet('"+behavior.getCallbackUrl()+"&x='+gFigures[gMyFigure].column+'&y='+gFigures[gMyFigure].row+'');");
			}
		};
	
		body.add(commitMoveButton);
    }
}