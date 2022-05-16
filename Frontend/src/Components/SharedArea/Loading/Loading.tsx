import "./Loading.css";
import loading from '../../../assets/images/loading.gif'
function Loading(): JSX.Element {
    return (
        <div className="Loading">
			<img src={loading} />
        </div>
    );
}

export default Loading;
