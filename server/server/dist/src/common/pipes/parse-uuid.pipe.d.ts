import { PipeTransform } from '@nestjs/common';
export declare class ParseUuidPipe implements PipeTransform<string> {
    transform(value: string): string;
}
