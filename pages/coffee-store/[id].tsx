import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '@/styles/coffee-store.module.css';

import cls from 'classnames';

import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '@/store/store-context';
import { isEmpty } from '@/utils';

export async function getStaticProps({ params }: { params: any }) {
	const coffeeStores = await fetchCoffeeStores();
	const findCoffeeStoreById = coffeeStores.find((coffeeStore: any) => {
		return coffeeStore.id.toString() === params.id;
	});
	return {
		props: {
			coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
		}, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	const coffeeStores = await fetchCoffeeStores();
	const paths = coffeeStores.map((coffeeStore: any) => {
		return { params: { id: coffeeStore.id.toString() } };
	});

	return {
		paths,
		fallback: true,
	};
}

export default function CoffeeStore(initialProps: any) {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const id = router.query.id;

	const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

	const {
		state: { coffeeStores },
	} = useContext(StoreContext);

	useEffect(() => {
		if (isEmpty(initialProps.coffeeStore)) {
			if (coffeeStores.length > 0) {
				const findCoffeeStoreById = coffeeStores.find((coffeeStore: any) => {
					return coffeeStore.id.toString() === id;
				});
				setCoffeeStore(findCoffeeStoreById);
			}
		}
	}, [id]);

	const { name, imgUrl, city, address } = coffeeStore;
	// const { address } = props.coffeeStore.location;

	const handleUpvoteButton = () => {};

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
				<meta name='description' content={`${name} coffee store`} />
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>← Back to home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image
						src={
							imgUrl ||
							'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
						}
						height={360}
						width={600}
						className={styles.storeImg}
						alt={name}
					/>
				</div>

				<div className={cls('glass', styles.col2)}>
					{address && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/places.svg'
								width='24'
								height='24'
								alt='places icon'
							/>
							<p className={styles.text}>{address}</p>
						</div>
					)}
					{city && (
						<div className={styles.iconWrapper}>
							<Image
								src='/static/icons/nearMe.svg'
								width='24'
								height='24'
								alt='near me icon'
							/>
							<p className={styles.text}>{city}</p>
						</div>
					)}
					<div className={styles.iconWrapper}>
						<Image
							src='/static/icons/star.svg'
							width='24'
							height='24'
							alt='star icon'
						/>
						<p className={styles.text}>0</p>
					</div>

					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>
						Up vote!
					</button>
				</div>
			</div>
		</div>
	);
}
