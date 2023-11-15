interface Props {
    message: string
    callback: (e:React.MouseEvent)=>void
}

const Dialog = ({ message,callback }: Props) => {


    return (
     <div className="absolute text-xl bg-white p-4 w-[35%] flex flex-col justify-center items-center gap-4 translate-x-[-50%] left-[50%] shadow-lg shadow-black">
        <span className="p-8">{message}</span>
        <button onClick={(e)=>callback(e)} className="p-2 px-6 hover:text-white hover:bg-black">OK</button>
     </div>
    )
}

export default Dialog