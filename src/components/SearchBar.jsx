import styles from "../styles/Navbar.module.css"; // TODO- move later in it's own module.css

export default function SearchBar() {
  return (

    <div className={styles.searchContainer}>
      {/* <p>Search</p> */}
      <form action="">
                   {/* <fieldset> */}
                {/* <legend>By title or author</legend> */}
                {/* <label for="search-term"></label> */}
                <input type="text" className={styles.search}  placeholder="Search..." />
            {/* </fieldset>        */}
      </form>


    </div>
  );
}
