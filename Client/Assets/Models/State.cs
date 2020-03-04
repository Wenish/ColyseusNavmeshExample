// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.33
// 

using Colyseus.Schema;

namespace Game.Models {
	public class State : Schema {
		[Type(0, "ref", typeof(StatePlayers))]
		public StatePlayers statePlayers = new StatePlayers();

		[Type(1, "ref", typeof(StateUnits))]
		public StateUnits stateUnits = new StateUnits();
	}
}
