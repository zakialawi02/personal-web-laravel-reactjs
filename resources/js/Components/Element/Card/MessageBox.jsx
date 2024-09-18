const MessageBox = (props) => {
    const { sender, body, time } = props;
    return (
        <div className="p-2 m-1 my-1 bg-slate-300 bg-opacity-60 rounded-xl dark:bg-zinc-400">
            <div className="flex items-center justify-between px-2 my-1 text-sm">
                <p>~ {sender}</p>
                <p>{time}</p>
            </div>
            <div className="px-2 my-1 text-start">
                <p>{body}</p>
            </div>
        </div>
    );
};

export default MessageBox;
