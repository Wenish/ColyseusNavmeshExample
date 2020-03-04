using UnityEngine;

namespace Game.Scripts.Controllers
{
    public class ControllerUnit : MonoBehaviour
    {
        public Vector3 DesiredPosition;
        public float SpeedLerp = .085f;
        public string Id = null;

        public void Start()
        {
            DesiredPosition = transform.position;
        }
        public void Update()
        {
            if (DesiredPosition != null)
            {
                var t = Time.deltaTime / SpeedLerp;
                transform.position = Vector3.Lerp(transform.position, DesiredPosition, t);
            }
        }
    }
}