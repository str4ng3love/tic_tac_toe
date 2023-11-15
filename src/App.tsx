import Board from "./components/Board"

const App = ()=>{
  return(
    <div className="h-screen bg-gradient-to-t from-neutral-700 to-stone-500 flex flex-col items-center ">
      <h1 className="text-3xl uppercase font-bold py-20">Tic Tac Toe</h1>
      <Board size={3}/>
    </div>
  )
}

export default App