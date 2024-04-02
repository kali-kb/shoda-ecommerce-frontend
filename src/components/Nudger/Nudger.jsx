import React from 'react';
import "./nudger.css"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/quantityValueChanger'

const Nudger = () => {

  const count = useSelector(state => state.quantity.value)
  const dispatch = useDispatch()

  return (
    <div id="nudger">
      <button onClick={() => dispatch(decrement())} name="subtract">-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())} name="add">+</button>
    </div>
  )
};

export default Nudger;