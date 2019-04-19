export function SplitPanel(props) {
    return (
        <div className="SplitPanel">
            <div className="SplitPanel-left">
                {props.left}
            </div>
            <div className="SplitPanel-center">
                {props.center}
            </div>
            <div className="SplitPanel-right">
                {props.right}
            </div>
        </div>
    );
}