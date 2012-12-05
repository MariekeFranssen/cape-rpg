package main.java.wicket.quickstart;

import java.io.Serializable;

public class LabelPropertyModel implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String label;
	
	public String getLabel(){
		return label;
	}

	public void setLabel(String label){
		this.label = label;
	}
}
