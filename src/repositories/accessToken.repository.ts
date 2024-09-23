import { AccessTokenModel } from '../dataBase';
import { IAccessToken } from '../models';

export class AccessTokenRepository {
  createAccessToken(accessToken: Partial<IAccessToken>): Promise<IAccessToken> {
    const accessTokenToCreate = new AccessTokenModel(accessToken);

    return accessTokenToCreate.save();
  }

  updateAccessTokenByParams(params: Partial<IAccessToken>, update: Partial<IAccessToken>) {
    return AccessTokenModel.updateOne(params, update);
  }

  async removeAccessTokenByParams(params: Partial<IAccessToken>) {
    return await AccessTokenModel.findOneAndDelete(params);
  }

  async findAccessTokenByParams(findObject: Partial<IAccessToken>): Promise<IAccessToken | null> {
    return await AccessTokenModel.findOne(findObject).populate('userId').select({ userId: 1, _id: 0 });
  }
}

export const accessTokenRepository = new AccessTokenRepository();
