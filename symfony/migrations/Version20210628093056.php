<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210628093056 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change Game signature to add rawg data';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE game ADD slug VARCHAR(255) NOT NULL, ADD rawg_id INT NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_232B318C989D9B62 ON game (slug)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_232B318C51302DC4 ON game (rawg_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_232B318C989D9B62 ON game');
        $this->addSql('DROP INDEX UNIQ_232B318C51302DC4 ON game');
        $this->addSql('ALTER TABLE game DROP slug, DROP rawg_id');
    }
}
