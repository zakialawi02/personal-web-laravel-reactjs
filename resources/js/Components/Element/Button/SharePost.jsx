import "https://static.addtoany.com/menu/page.js";

const SharePost = () => {
    return (
        <>
            <p className="text-sm">Share:</p>
            {/* AddToAny BEGIN  */}

            <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                <a className="a2a_button_facebook"></a>
                <a className="a2a_button_email"></a>
                <a className="a2a_button_whatsapp"></a>
                <a className="a2a_button_linkedin"></a>
                <a className="a2a_button_telegram"></a>
                <a className="a2a_button_x"></a>
            </div>

            {/* AddToAny END  */}
        </>
    );
};

export default SharePost;
