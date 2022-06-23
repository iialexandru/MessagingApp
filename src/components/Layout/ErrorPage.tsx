import styles from '../../styles/scss/Layout/404.module.scss'


const ErrorPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.flex_error}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655975561/MessagingApp/undraw_page_not_found_re_e9o6_dhhhbp.svg' width={400} height={400} alt='Error' />
                <div className={styles.info}>
                    <h1>Not Found</h1>
                    <p>The requested page didn't exist. Either you have an expired link or an invalid one. Please check it again and make sure that it is correct.</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;