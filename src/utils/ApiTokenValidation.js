import verifyToken from './verifyToken'

function apiTokenValidation(req, res) {
	//--------------
	if (!req.cookies.token) {
		return res.status(401).json({ message: 'No autenticado' })
	}
	const verifiedToken = verifyToken(req.cookies.token)
	if (!verifiedToken) {
		return res.status(401).json({ message: 'No autenticado' })
	}
	//--------------
}
