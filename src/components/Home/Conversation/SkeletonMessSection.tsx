import styles from '../../../styles/scss/Home/Conversation/MessSection.module.scss';


const SkeletonMessSection = () => {

    return (
        <div  className={styles.skeleton_section}>
            <div className={styles.skeleton_img}></div>

            <div className={styles.skeleton_info}>
                <span id='name'></span>
                <span id='message'></span>
            </div>
        </div>   
    )
}

export default SkeletonMessSection;