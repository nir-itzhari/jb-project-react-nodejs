import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound Box">
            <p>The page you are looking for doesn't exist
                lets listen to some music =]
            </p>
            <iframe width="580" height="285" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" allow="autoplay" title="Page not Found"></iframe>
        </div>
    );
}

export default PageNotFound;
