package wicket.quickstart;

import java.awt.Color;

public enum Character {
	ANNE_MARIE("Anne Marie", 1, Color.ORANGE),
	MARGARET("Margaret", 2, Color.GREEN),
	THERESA("Theresa", 3, Color.BLUE),
	CELESTE("Celeste", 4, Color.YELLOW),
	ANGELICA("Angelica", 5, Color.MAGENTA),
	BERNADETTE("Bernadette", 6, Color.RED);

	String name;
	int start;
	Color color;
	
	Character(String name, int start, Color color){
		this.name = name;
		this.start = start;
		this.color = color;
	}
	
	public String getName(){
		return name;
	}
	
	public String toString(){
		return name;
	}
}