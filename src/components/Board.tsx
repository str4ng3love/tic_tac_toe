import { useEffect, useState } from 'react'
import Dialog from './Modal';
interface Props {
    size: number;
}
type BoardArray =
    { value: string | null }[][]

const makeBoard = (size: number) => {
   
    let board: BoardArray = []
    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i].push({ value: null })
        }
    }
    return board
}
const Board = ({ size = 3 }: Props) => {
    const [currentPlayer, setCurrentPlayer] = useState('x')
    const [boardSize, setBoardSize] = useState(size)
    const [board, setBoard] = useState(makeBoard(boardSize))
    const [canPlay, setCanPlay] = useState(true)
    const [dialog, setDialog] = useState({ show: false, message: '' })
    const [wins, setWins] = useState({ x: 0, o: 0 })
    const [stepsLeft, setStepsLeft] =useState(Math.pow(boardSize, 2))



    const checkForWin = (arr: BoardArray) => {
        let vertical: {
            value: string | null;
        }[] = []
        let diagonal: {
            value: string | null;
        }[] = []
        let diagonalR: {
            value: string | null;
        }[] = []
        let horizontal: {
            value: string | null;
        }[] = []

        for (let i = 0; i < arr.length; i++) {
            diagonal.push(arr[i][i])
            diagonalR.push(arr[arr.length - (1 + i)][i])

            for (let j = 0; j < arr[i].length; j++) {
                vertical.push(arr[i][j])
                horizontal.push(arr[arr.length - (1 + j)][i])

            }

            if (vertical.every((el) => el.value === vertical[0].value && el.value !== null)) {

                setDialog({ message: `${vertical[0].value} wins`, show: true })
                let x = wins.x
                let o = wins.o

                vertical[0].value === 'x' ? x += 1 : o += 1

                setWins(({ o: o, x: x }))
                setStepsLeft(Math.pow(boardSize, 2))
                setCanPlay(false)
            } else {
                vertical = []
            }
            if (horizontal.every((el) => el.value === horizontal[0].value && el.value !== null)) {
                setDialog({ message: `${horizontal[0].value} wins`, show: true })
                let x = wins.x
                let o = wins.o

                horizontal[0].value === 'x' ? x += 1 : o += 1

                setWins(({ o: o, x: x }))
                setStepsLeft(Math.pow(boardSize, 2))
                setCanPlay(false)
            } else {
                horizontal = []
            }

        }
        if (diagonal.every((el) => el.value === diagonal[0].value && el.value !== null)) {
            setDialog({ message: `${diagonal[0].value} wins`, show: true })
            let x = wins.x
            let o = wins.o

            diagonal[0].value === 'x' ? x += 1 : o += 1

            setWins(({ o: o, x: x }))
            setStepsLeft(Math.pow(boardSize, 2))
            setCanPlay(false)
        }
        if (diagonalR.every((el) => el.value === diagonalR[0].value && el.value !== null)) {
            setDialog({ message: `${diagonalR[0].value} wins`, show: true })
            let x = wins.x
            let o = wins.o

            diagonalR[0].value === 'x' ? x += 1 : o += 1

            setWins(({ o: o, x: x }))
            setStepsLeft(Math.pow(boardSize, 2))
            setCanPlay(false)
        }


    }
  
    useEffect(()=>{
       setStepsLeft(Math.pow(boardSize, 2))
    }, [boardSize])
    useEffect(() => {
        checkForWin(board)
  
        if (stepsLeft === 0) {
            setCanPlay(false)
            setDialog({ message: "Draw", show: true })
            setStepsLeft(Math.pow(boardSize, 2))
        }
    }, [currentPlayer])
    return (
        <div className="flex flex-col gap-2 p-8 bg-stone-300">
            <div className='flex justify-between'>
                <span className='p-2 text-xl uppercase'>x:&nbsp;{wins.x}</span>
                <span className='p-2 text-xl uppercase'>o:&nbsp;{wins.o}</span>
            </div>
            <button onClick={() => setWins({ o: 0, x: 0 })} className='p-2 capitalize mb-10 bg-white hover:text-white hover:bg-black'>clear</button>
            <span className='pb-4 text-xl uppercase'>{currentPlayer}&nbsp;turn</span>
            <input type="range" min={3} max={12} value={boardSize} onChange={(e) => {setCurrentPlayer('x'); setCanPlay(true); setBoard(makeBoard(parseInt(e.currentTarget.value))); setBoardSize(parseInt(e.currentTarget.value)) }} />
            <span>{boardSize}</span>

            <button onClick={() => { setCanPlay(true); setBoard(makeBoard(boardSize)), setCurrentPlayer('x') }} className='p-2 capitalize bg-white hover:text-white hover:bg-black'>reset</button>
            <div className='flex justify-center text-xl uppercase font-bold'>
                {board.map((col, i) => <div key={i}>{col.map((row, j) => <div onClick={() => {
                    if (canPlay && board[i][j].value === null) {

                        setStepsLeft(stepsLeft-1)
                        if (currentPlayer === 'x') {
                            setBoard((prev) => {
                                let newPrev = prev
                                newPrev[i][j].value = 'x'
                                return newPrev
                            })
                            setCurrentPlayer("o")
                        } else {
                            setBoard((prev) => {
                                let newPrev = prev
                                newPrev[i][j].value = 'o'
                                return newPrev
                            })
                            setCurrentPlayer('x')
                        }
                    }
                }} className=" bg-white h-10 w-10 border-2 border-solid border-black flex justify-center items-center" key={j}>{row ? row.value : ''}</div>)}</div>)}
            </div>
            {dialog.show ? <Dialog message={dialog.message} callback={() => { setCurrentPlayer('x'); setCanPlay(true); setDialog({ message: '', show: false }); setBoard(makeBoard(boardSize))}} /> : <></>}
        </div>
    )
}

export default Board