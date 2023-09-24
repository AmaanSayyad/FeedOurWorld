import axios from 'axios';
import {
	LoginFormInterface,
	SignupFormInterface,
} from '../../../interface/AllFarmsInterface';

// const URL = `http://localhost:5000`
const URL = `https://fow-farm-api.onrender.com`;

const BUSINESS_URL = `${URL}/api/v1/business`;
const USER_URL = `${URL}/api/v1/user`;
const STOCK_URL = `${URL}/api/v1/stockProduct`;
const ONDEMAND_URL = `${URL}/api/v1/ondemandProduct`;
const CART_URL = `${URL}/api/v1/cart`;
const CONSUMER_URL = `${URL}/api/v1/consumer`;
const BUY_URL = `${URL}/api/v1/buy`;
const REVIEW_URL = `${URL}/api/v1/reviews`;
const FAVOURITE_URL = `${URL}/api/v1/favourite`;

const BUSINESS_API = axios.create({ baseURL: BUSINESS_URL });
const USER_API = axios.create({ baseURL: USER_URL });
const STOCK_API = axios.create({ baseURL: STOCK_URL });
const ONDEMAND_API = axios.create({ baseURL: ONDEMAND_URL });
const CART_API = axios.create({ baseURL: CART_URL });
const CONSUMER_API = axios.create({ baseURL: CONSUMER_URL });
const BUY_API = axios.create({ baseURL: BUY_URL });
const REVIEW_API = axios.create({ baseURL: REVIEW_URL });
const FAVOURITE_API = axios.create({ baseURL: FAVOURITE_URL });

export const signupMethod = (signupDetails: SignupFormInterface) =>
	USER_API.post(`/signup`, signupDetails);
export const loginMethod = (loginDetails: LoginFormInterface) =>
	USER_API.post('/login', loginDetails);

export const forgotPassword = (_email: string) =>
	USER_API.post('/forgotPassword', { email: _email });

export const updateMe = (_token: string, formData: FormData) =>
	USER_API.patch(`/updateMe`, formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getMe = (_token: string) =>
	USER_API.get(`/me`, { headers: { Authorization: `Bearer ${_token}` } });

export const createMyBusinessProfile = (_token: string) =>
	BUSINESS_API.post(
		`/`,
		{},
		{ headers: { Authorization: `Bearer ${_token}` } }
	);

export const getAllBusiness = () => BUSINESS_API.get('/');
export const getSingleBusiness = (_id: string, _token: string) =>
	BUSINESS_API.get(`/${_id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const getMyBusinessProfile = (_token: string) =>
	BUSINESS_API.get(`/myProfile`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const updateMyBusinessProfileDetails = (
	_token: string,
	_details: {
		shippingCostStandard: number;
		shippingTimeStandard: string;
		shippingCostExpress: number;
		shippingTimeExpress: string;
		shippingRadius: number;
		shippingOndemandTime: string;
		shippingOndemandCost: number;
	}
) =>
	BUSINESS_API.patch(`/myProfile`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const updateMyBusinessProfileLocation = (
	_token: string,
	_details: {
		location: {
			type: string;
			coordinates: Array<number>;
			description: string;
		};
	}
) =>
	BUSINESS_API.patch(`/myProfile`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const updateMyWalletAddress = (
	_token: string,
	_details: {
		walletAddress: string;
	}
) =>
	BUSINESS_API.patch(`/myProfile`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const distance = (_token: string, _id: string, _unit: string) =>
	BUSINESS_API.get(`/distance/${_id}/unit/${_unit}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getAllStockProduct = () => STOCK_API.get('/');
export const getSingleStockProduct = (
	_id: string,
	_token: string,
	_unit: string
) =>
	STOCK_API.get(`/${_id}?unit=${_unit}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const getMyStockProducts = (_token: string) =>
	STOCK_API.get(`/myStockProduct`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const updateMyStockProduct = (
	_token: string,
	_id: string,
	_formData: FormData
) =>
	STOCK_API.patch(`/${_id}`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const createMyStockProduct = (_token: string, _formData: FormData) =>
	STOCK_API.post(`/`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const deleteStockProduct = (_token: string, _id: string) =>
	STOCK_API.delete(`/${_id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getAllOndemandProduct = () => ONDEMAND_API.get('/');
export const getSingleOndemandProduct = (
	_id: string,
	_token: string,
	_unit: string
) =>
	ONDEMAND_API.get(`/${_id}?unit=${_unit}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const getMyOndemandProduct = (_token: string) =>
	ONDEMAND_API.get(`/myOndemandProduct`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const updateMyOndemandProduct = (
	_token: string,
	_id: string,
	_formData: FormData
) =>
	ONDEMAND_API.patch(`/${_id}`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const createMyOndemandProduct = (_token: string, _formData: FormData) =>
	ONDEMAND_API.post(`/`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const deleteOndemandProduct = (_token: string, _id: string) =>
	ONDEMAND_API.delete(`/${_id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const addProductToCart = (
	_itemId: string,
	_token: string,
	_details: {
		orderQuantity: number;
		orderUnit: string;
	}
) =>
	CART_API.post(`/${_itemId}/add`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getMyCart = (_token: string) =>
	CART_API.get(`/myCart`, { headers: { Authorization: `Bearer ${_token}` } });
export const removeItemFromCart = (_token: string, _itemId: string) =>
	CART_API.delete(`/${_itemId}/remove`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const createMyConsumerProfile = (_token: string) =>
	CONSUMER_API.post(
		`/`,
		{},
		{ headers: { Authorization: `Bearer ${_token}` } }
	);
export const getMyConsumerProfile = (_token: string) =>
	CONSUMER_API.get(`/myProfile`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const updateMyConsumerProfileLocation = (
	_token: string,
	_details: {
		location: {
			type: string;
			coordinates: Array<number>;
			description: string;
		};
	}
) =>
	CONSUMER_API.patch(`/myProfile`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const createBuy = (
	_token: string,
	_details: {
		paymentOption: string;
		deliveryType: string;
		receipt: string;
		paid: boolean;
	}
) =>
	BUY_API.post(`/`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getMyBuyConsumer = (_token: string) =>
	BUY_API.get(`/myOrder`, { headers: { Authorization: `Bearer ${_token}` } });
export const getSingleBuy = (_token: string, _id: string) =>
	BUY_API.get(`/${_id}`, { headers: { Authorization: `Bearer ${_token}` } });
export const getMyOrdersProducer = (_token: string) =>
	BUY_API.get(`/businessOrder`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const updateMyOrderPaid = (
	_token: string,
	_id: string,
	_details: {
		paid: boolean;
	}
) =>
	BUY_API.patch(`/${_id}`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const updateMyOrderDelivery = (
	_token: string,
	_id: string,
	_details: {
		delivered: boolean;
	}
) =>
	BUY_API.patch(`/${_id}`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getAmount = (
	_token: string,
	_paymentOption: string,
	_deliveryType: string
) =>
	BUY_API.get(
		`/getAmount?paymentOption=${_paymentOption}&deliveryType=${_deliveryType}`,
		{ headers: { Authorization: `Bearer ${_token}` } }
	);

export const getReviewForFarm = (_token: string, _farmId: string) =>
	REVIEW_API.get(`/farm/${_farmId}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const createReviewForFarm = (
	_token: string,
	_farmId: string,
	_details: {
		review: string;
		rating: number;
	}
) =>
	REVIEW_API.post(`/farm/${_farmId}`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const addFavourite = (_token: string, _farmId: string) =>
	FAVOURITE_API.post(
		`/${_farmId}`,
		{},
		{ headers: { Authorization: `Bearer ${_token}` } }
	);
export const removeFavourite = (_token: string, _farmId: string) =>
	FAVOURITE_API.delete(`/${_farmId}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
export const getMyFavouriteFarms = (_token: string) =>
	FAVOURITE_API.get('/', { headers: { Authorization: `Bearer ${_token}` } });
