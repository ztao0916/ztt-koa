import { Rule, RuleType } from '@midwayjs/decorator';

export class LoginDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  pwd: string;
}

export class RegistryDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  pwd: string;

  @Rule(RuleType.string().required())
  confirmPwd: string;
}
