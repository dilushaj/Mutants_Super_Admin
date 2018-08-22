import { MasterDataModule } from './master-data.module';

describe('MasterDataModule', () => {
  let masterDataModule: MasterDataModule;

  beforeEach(() => {
    masterDataModule = new MasterDataModule();
  });

  it('should create an instance', () => {
    expect(masterDataModule).toBeTruthy();
  });
});
