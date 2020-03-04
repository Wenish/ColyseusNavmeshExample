// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.33
// 

using Colyseus.Schema;

namespace Game.Models {
	public class StateUnits : Schema {
		[Type(0, "map", typeof(MapSchema<Unit>))]
		public MapSchema<Unit> units = new MapSchema<Unit>();
	}
}
