import styles from '../../styles/scss/Home/Home.module.scss';


const Cover = () => {

    return (
        <div className={styles.cover_container}>
            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1657196735/MessagingApp/undraw_chatting_re_j55r_1_z8ykrq.svg' width={300} height={300} alt='Cover' />
        </div>
    )
}

export default Cover;