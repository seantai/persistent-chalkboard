import './Modal.css'

export const ModalItem = ({title, children, isOpen, passingEventHandler}) =>{

  return (
    <>
      <div 
        className={`modal__item`}
        onClick={passingEventHandler}
        >
        <p className="modal__item_caret">{'>'}</p>
        <h2>{title}</h2>
        <div className="modal__item_inner">
          {isOpen && [children]}
        </div>
      </div>
    </>
  )
}