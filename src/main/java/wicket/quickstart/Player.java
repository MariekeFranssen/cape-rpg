package wicket.quickstart;
import java.io.Serializable;
import java.util.Vector;

public class Player implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 8282400224274240915L;
	String name;
	int avatar;
	int locationx, locationy;
		
	public Player(){
		locationx = 1;
		locationy = 1;
	}
		
	public void addMove(int x, int y){
		System.out.println("added");
		System.out.println(Integer.toString(locationx));		
		System.out.println(Integer.toString(locationy));		
	}
	
	public int getLocationx(){
		return locationx;
	}
	
	public void setLocationx(int locationx){
		this.locationx = locationx;
		System.out.println("X Changed");
	}

	public int getLocationy(){
		return locationx;
	}
	
	public void setLocationy(int locationy){
		this.locationy = locationy;
		System.out.println("Y Changed");
	}

	public String getName(){
		return name;
	}
	
	public void setName(String name){
		if(name.equalsIgnoreCase("Marieke")||name.equalsIgnoreCase("Mieke")||name.equalsIgnoreCase("Livak")||name.equalsIgnoreCase("Alexeika")||name.equalsIgnoreCase("Chanita")){
			this.name = "Doos";
		} else {
			this.name = name;
		}
	}
	
	public String getAvatar(){
		return Integer.toString(avatar);
	}
	
	public void setAvatar(String avatar){
		this.avatar = Integer.parseInt(avatar);
	}
	
}
