import request from '@/utils/request'

export function CompanyMemberList(params) {
	return request({
		url: '/mock/companymember/list',
		method: 'get',
		params: params
	})
}