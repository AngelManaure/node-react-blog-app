import { Link } from 'react-router-dom'

import './HomePage.css'

function HomePage() {
  return (
    <main className='homeContainer'>
    <section className="upSection">
      <div className="categoryModalContainer">
      <div className="categoryModalContent">
        <details className='categoryModal'>
          <summary className='categoryModalName'>Categorías</summary>
            <ul className="categoryModalList">
              <li><Link  className="categoryModalItem">Frontend</Link></li>
              <li><Link className="categoryModalItem">Backend</Link></li>
              <li><Link className="categoryModalItem">Proyectos</Link></li>
              <li><Link className="categoryModalItem">Dudas</Link></li>
            </ul>
        </details>
      </div>
      </div>

      <article className='upsectionTextContainer'>
      <p className='upSectionText'>
        Comparte tus ideas y dudas sobre tu proyecto o sobre uno que quieras realizar
        </p>
      </article>

      <div className="createPostButtonContainer">
      <button className="createPost">Crear Post</button>
      </div>
      <div className="upSectionIcons">

        <a href="#post-section" className='goDown'>
        <i className="ri-arrow-down-circle-fill"></i>
        </a>
      </div>
    </section>

    <section className="postSection" id='post-section'>
    <article className='upsectionTextContainer'>
      <p className='upSectionText'>
        Comparte tus ideas y dudas sobre tu proyecto o sobre uno que quieras realizar
        </p>
      </article>
      </section>    
    </main>
  )
}

export default HomePage