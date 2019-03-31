class RectangleCollider extends Component implements IObserver {

    public topLeft: Vector2;
    public topRight: Vector2;
    public bottomLeft: Vector2;
    public bottomRight: Vector2;

    public readonly transform: Transform;


    public constructor(gameObject: GameObject) {
        super("RectangleCollider", gameObject);

        this.transform = gameObject.getTransform();
        let transform: Transform = this.transform;
        transform.registerObserver(this);
        this.topLeft = new Vector2(transform.x, transform.y);
        this.topRight = new Vector2(transform.x + transform.width, transform.y);
        this.bottomLeft = new Vector2(transform.x, transform.y + transform.height);
        this.bottomRight = new Vector2(transform.x + transform.width, transform.y + transform.height);
    }

    public detectCollision(other: RectangleCollider): boolean {
        
        return !(
            other.topLeft.x > this.topRight.x ||
            other.topRight.x < this.topLeft.x ||
            other.topLeft.y > this.bottomLeft.y ||
            other.bottomLeft.y < this.topLeft.y
        );
    }

    public receiveObservableUpdate(): void {
        this.topLeft.x = this.transform.x;
        this.topLeft.y = this.transform.y;
        this.topRight.x = this.transform.x + this.transform.width;
        this.topRight.y = this.transform.y;
        this.bottomLeft.x = this.transform.x;
        this.bottomLeft.y = this.transform.y + this.transform.height;
        this.bottomRight.x = this.transform.x + this.transform.width;
        this.bottomRight.y = this.transform.y + this.transform.height;
    }
}