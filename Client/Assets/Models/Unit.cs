// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.33
// 

using Colyseus.Schema;

namespace Game.Models {
	public class Unit : Schema {
		[Type(0, "string")]
		public string id = "";

		[Type(1, "ref", typeof(Position))]
		public Position position = new Position();

		[Type(2, "number")]
		public float moveSpeed = 0;

		[Type(3, "number")]
		public float rotation = 0;
	}
}
