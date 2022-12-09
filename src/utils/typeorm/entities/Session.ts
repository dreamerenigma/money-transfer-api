import { ISession } from "connect-typeorm/out";
import { 
	Index, 
	Column, 
	PrimaryColumn,
	DeleteDateColumn, 
	Entity,
} from "typeorm";

@Entity({ name: 'sessions' })
export class Session implements ISession {
	@Index()
	@Column('bigint')
	public expiredAt = Date.now();

	@PrimaryColumn('varchar', { length: 255 })
	public id = '';

	@Column('text')
	public json = '';

	@DeleteDateColumn()
	public destroyedAt?: Date;
}
