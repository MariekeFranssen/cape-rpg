/*
 * $Id: QuickStartSession.java 458029 2005-11-08 15:55:17Z ehillenius $
 * $Revision: 458029 $ $Date: 2005-11-08 16:55:17 +0100 (Tue, 08 Nov 2005) $
 * 
 * ==============================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package wicket.quickstart;

import java.util.Vector;

import wicket.protocol.http.WebApplication;
import wicket.protocol.http.WebSession;

/**
 * Subclass of WebSession for QuickStartApplication to allow easy and typesafe
 * access to session properties.
 * 
 * @author Jonathan Locke
 */

public final class QuickStartSession extends WebSession
{
	//  TODO Add any session properties here
	public Player player;
	public Vector<Player> players;
	public Vector<Player> npcs;
	
	/**
	 * Constructor
	 * 
	 * @param application
	 *            The application
	 */
	protected QuickStartSession(final WebApplication application, Vector<Player> players, Vector<Player> npcs)
	{
		super(application);
		player = new Player();
		players.add(player);
		this.players = players;
		this.npcs = npcs;
	}
}
