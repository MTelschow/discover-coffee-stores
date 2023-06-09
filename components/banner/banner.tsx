import styles from '@/components/banner/banner.module.css';

export default function Banner({
	buttonText,
	handleOnClick,
}: {
	buttonText: string;
	handleOnClick: any;
}) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<span className={styles.title1}>Coffee</span>
				<span className={styles.title2}>Connoisseur</span>
			</h1>
			<p className={styles.subTitle}>Discover you local coffee shops!</p>
			<div className={styles.buttonWrapper}>
				<button className={styles.button} onClick={handleOnClick}>
					{buttonText}
				</button>
			</div>
		</div>
	);
}
