import PageNav from "../components/PageNav";
import styles from "./styles/ProductPage.module.css";

const ProductPage = () => {
    return (
        <div>
            <PageNav />
            <div>
                <image src="https://via.placeholder.com/150" alt="product" />
            </div>
            <div className={styles.about_container}>
                <h1 className={styles.about_heading}>About us.</h1>
                <p className={styles.about_text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit illo odit perspiciatis labore magni dolorem reprehenderit nisi ducimus? Voluptas nihil animi fuga architecto ullam adipisci ut sapiente aliquid corrupti nulla!</p>
            </div>
        </div>
    );
};

export default ProductPage;