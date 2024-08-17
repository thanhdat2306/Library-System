import { useState } from "react";

const useNotification = (): {
    visible: boolean;
    mainText: string;
    subText: string;
    showNotification: (mainText: string, subText: string, ms: number) => void
} => {
    const [visible, setVisible] = useState(false);
    const [mainText, setMainText] = useState("");
    const [subText, setsubText] = useState("");

    const showNotification = (mainText: string, subText: string, ms: number): void => {
        setVisible(true);
        setMainText(mainText);
        setsubText(subText);
        setTimeout(() => {
            setVisible(false);
        }, ms);
    };

    return {
        visible,
        mainText,
        subText,
        showNotification
    };
}

export default useNotification;