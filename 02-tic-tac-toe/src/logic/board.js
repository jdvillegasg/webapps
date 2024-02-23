import {Turns} from '../constants.js';

export const detectWinner = (board) => {
    const side = Math.sqrt(board.length);

    const turnCounterOnDiagonal = (len, axis) => {
      let cnt_diags_x = 0;
      let cnt_diags_o = 0;

      for (let k=0; k<len; k++){
        if (axis === "main"){
          if (board[k*len + k] === Turns.X){
            cnt_diags_x += 1;
          }
          if (board[k*len + k] === Turns.O){
            cnt_diags_o += 1;
          }
        }else if (axis === "reverse"){
          if (board[(k+1)*(len-1)] === Turns.X){
            cnt_diags_x += 1;
          }
          if (board[(k+1)*(len-1)] === Turns.O){
            cnt_diags_o += 1;
          }
        }       
      }

      if (cnt_diags_x === len){
        return Turns.X;
      }
      if (cnt_diags_o === len){
        return Turns.O;
      }

      return null;
    }    
    
    const turnCounterOffDiagonal = (len, axis) =>{
        for (let k=0; k<len; k++){
          let cnt_axis_x = 0;
          let cnt_axis_o = 0;
          for (let l=0; l<len; l++){
              if (axis === "rows"){
                if (board[k*len + l] === Turns.X){
                  cnt_axis_x += 1;
                }
                if (board[k*len + l] === Turns.O){
                  cnt_axis_o += 1;
                }        
              } else if (axis === "columns"){
                if (board[l*len + k] === Turns.X){
                  cnt_axis_x += 1;
                }
                if (board[l*len + k] === Turns.O){
                  cnt_axis_o += 1;
                }
              }              
          }
          
          if (cnt_axis_x === len){
            return Turns.X;
          }
          if (cnt_axis_o === len){
            return Turns.O;
          }
        }
        return null;
    }

    const winner_diag_main = turnCounterOnDiagonal(side, "main");
    if (winner_diag_main !== null){
      return winner_diag_main;
    }
    const winner_diag_rev = turnCounterOnDiagonal(side, "reverse");
    if (winner_diag_rev !== null){
      return winner_diag_rev;
    }
    const winner_row = turnCounterOffDiagonal(side, "rows");
    if (winner_row !== null){
      return winner_row;
    }
    const winner_cols = turnCounterOffDiagonal(side, "columns");
    if (winner_cols !== null){
      return winner_cols;
    }
    return null;    
  }