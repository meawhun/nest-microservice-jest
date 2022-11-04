import { Injectable } from '@nestjs/common';
import { request, gql } from 'graphql-request';

@Injectable()
export class GqlrequestService {

  async query(command: string) {
    const query = gql`${command}`;
    const data = await request('http://localhost:8080/v1/graphql', query);  
      return data;
  }

}
