import "./NotificationBox.css"

interface NotificationBoxProps {
    visible: boolean;
    mainText: string;
    subText: string;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ visible, mainText, subText }) => {
    if (!visible) return <></>;

    return(
    <div className="notification-box text-center" role="alert">
       <h1 className="main-text pb-2">{mainText}</h1>
       <h3>{subText}</h3>
    </div>
    )
}

export default NotificationBox;     