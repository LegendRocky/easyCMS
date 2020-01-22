import request from '@/utils/request'

export function listHealth() {
  	return request({
    	url: '/mock/health/list',
    	method: 'get'
  	})
}

export function deleteHealth(username) {
  	return request({
	    url: '/mock/health/delete',
	    method: 'get',
	    params: { username }
  	})
}

export function MylistHealth(params) {
	return request({
		url: '/mock/health/mylist',
		method: 'get',
		params: params
	})
}

export function SignedList(params) {
	return request({
		url: '/mock/health/signedlist',
		method: 'get',
		params: params
	})
}