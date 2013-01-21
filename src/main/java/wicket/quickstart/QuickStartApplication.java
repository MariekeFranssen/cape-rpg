package wicket.quickstart;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import wicket.ISessionFactory;
import wicket.Session;
import wicket.protocol.http.WebApplication;
import java.util.Vector;

/**
 * Application object for your web application. If you want to run this application without deploying, run the Start class.
 * 
 * @see wicket.quickstart.Start#main(String[])
 */
public class QuickStartApplication extends WebApplication
{
	Vector<Player> players, npcs;
	
	/** Logging */
	private static final Log log = LogFactory.getLog(QuickStartApplication.class);

    /**
     * Constructor
     */
	public QuickStartApplication()
	{
		players = new Vector<Player>();
		npcs = new Vector<Player>();
	}
	
	/**
	 * @see wicket.Application#getHomePage()
	 */
	public Class getHomePage()
	{
		return Index.class;
	}

    /**
     * @see wicket.protocol.http.WebApplication#getSessionFactory()
     */
    public ISessionFactory getSessionFactory()
    {
        return new ISessionFactory()
        {        	
			public Session newSession()
            {
                return new QuickStartSession(QuickStartApplication.this, players);
            }
        };
    }
}