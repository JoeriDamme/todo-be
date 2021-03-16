import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@helpers/sequelize';

export class TodoModel extends Model {}

TodoModel.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  description: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  timestamps: true,
  hooks: {
    beforeUpdate(instance) {
      const prevCompleted = instance.previous<any>('completed');
      const completed = instance.get('completed');

      // If previous value of completed is false, but new value is true, set the completedAt timestamp.
      if (!prevCompleted && completed) {
        instance.set('completedAt', Date.now());
      } else if (prevCompleted && !completed) {
        instance.set('completedAt', null);
      }
    },
    afterCreate(instance) {
      // CompletedAt is null in the beginning, but after create it's not set.
      // Return this value to consumer, even if value is null.
      !instance.getDataValue('completedAt') && instance.setDataValue('completedAt', null);
    }
  }
});
