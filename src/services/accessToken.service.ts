import { accessTokenRepository } from '../repositories';
import { IAccessToken } from '../models';

class AccessTokenService {
  async createTokenPair(accessToken: Partial<IAccessToken>): Promise<IAccessToken> {
    return await accessTokenRepository.createAccessToken(accessToken);
  }

  async removeToken(params: Partial<IAccessToken>): Promise<IAccessToken | null> {
    return await accessTokenRepository.removeAccessTokenByParams(params);
  }

  async findAccessTokenByParams(findObject: Partial<IAccessToken>): Promise<IAccessToken | null> {
    return await accessTokenRepository.findAccessTokenByParams(findObject);
  }
}

export const accessTokenService = new AccessTokenService();
