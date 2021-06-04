<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210604104437 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add Game and GamePlayed entities';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game_played (id INT AUTO_INCREMENT NOT NULL, player_id INT DEFAULT NULL, game_id INT NOT NULL, time_spent INT NOT NULL, INDEX IDX_11F862FC99E6F5DF (player_id), INDEX IDX_11F862FCE48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE game_played ADD CONSTRAINT FK_11F862FC99E6F5DF FOREIGN KEY (player_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE game_played ADD CONSTRAINT FK_11F862FCE48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE game_played DROP FOREIGN KEY FK_11F862FCE48FD905');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE game_played');
    }
}
