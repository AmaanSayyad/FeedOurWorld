export interface ItemInterface {
	_id: string;
	amount: number;
	available: boolean;
	description: string;
	farm: {
		id: string;
		name: string;
	};
	image: [string];
	listedAt: string;
	name: string;
	price: number;
	productReviews: [object];
	ratingsAverage: number;
	ratingsQuantity: number;
	summery: string;
	weight: string;
}

export interface RouterQueryInterface {
	data: string;
	[key: string]: string | string[];
}

export interface SignupFormInterface {
	role: string;
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface LoginFormInterface {
	email: string;
	password: string;
}

export interface ResetPasswordInterface {
	password: string;
	passwordConfirm: string;
}

export interface CommentInterface {
	createAt: string;
	product: string;
	id: string;
	rating: string;
	review: string;
	user: {
		name: string;
		photo: string;
	};
	Prototype: Function;
}

export interface WriteCommentInterface {
	comment: boolean;
	setComment: Function;
	value: number;
	setValue: Function;
	title: string;
	setTitle: Function;
	review: string;
	setReview: Function;
	commentFunction: Function;
}

export interface CartItemsInterface {
	quantity: number;
	price: number;
	name: string;
	summary: string;
	weight: string;
	image: string;
	id: string;
	loadFunc: Function;
}

export interface BusinessProfileDetailsUpdateInterface {
	shippingCostStandard: number;
	shippingTimeStandard: string;
	shippingCostExpress: number;
	shippingTimeExpress: string;
	shippingRadius: number;
	shippingOndemandTime: string;
	shippingOndemandCost: number;
}

export interface OndemandProduct {
	product: string;
	name: string;
	image: string;
	capacity: number;
	unit: 'lb' | 'kg' | 'oz';
	price: number;
	organic: 'yes' | 'no';
	id: string;
	freshRemain: number;
}

export interface StockProduct {
	product: string;
	name: string;
	batch: string;
	image: string;
	stock: number;
	unit: 'lb' | 'kg' | 'oz';
	price: number;
	organic: 'yes' | 'no';
	id: string;
	freshRemain: number;
}
