import * as React from 'react'

interface Prop {
  num: number;
}

const NumCard = React.memo((prop: Prop) => {
  const li = []

  for (var i = 0; i < prop.num; ++i) {
    li.push(
      <li key={i}>
        <a href="#" className="">
          <div className="up">
            <div className="shadow"></div>
            <div className="inn">{i}</div>
          </div>
          <div className="down">
            <div className="shadow"></div>
            <div className="inn">{i}</div>
          </div>
        </a>
      </li>
    )
  }

  return (
    <ul className=''>
      {li}
    </ul>
  )
})

export default NumCard