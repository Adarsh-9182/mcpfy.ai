import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { StatTile } from '@/components/ui/StatTile';
import { Blocks } from '@/components/docs/Blocks';
import { BarList } from '@/components/ui/Chart';

describe('StatusBadge', () => {
  it('renders a readable label for each status', () => {
    const { rerender } = render(<StatusBadge status="live" />);
    expect(screen.getByText('Live')).toBeInTheDocument();

    rerender(<StatusBadge status="degraded" />);
    expect(screen.getByText('Degraded')).toBeInTheDocument();

    rerender(<StatusBadge status="failed" />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>edge</Badge>);
    expect(screen.getByText('edge')).toBeInTheDocument();
  });
});

describe('StatTile', () => {
  it('shows the label, value and hint', () => {
    render(<StatTile label="p95 latency" value="142ms" hint="traffic-weighted" />);
    expect(screen.getByText('p95 latency')).toBeInTheDocument();
    expect(screen.getByText('142ms')).toBeInTheDocument();
    expect(screen.getByText('traffic-weighted')).toBeInTheDocument();
  });

  it('renders a delta when one is supplied', () => {
    render(
      <StatTile label="Calls" value="1.2M" delta={{ value: '24.6%', direction: 'up', good: true }} />,
    );
    expect(screen.getByText('24.6%')).toBeInTheDocument();
  });
});

describe('BarList', () => {
  it('labels every row and formats values', () => {
    render(
      <BarList
        items={[
          { label: 'list_invoices', value: 82140 },
          { label: 'get_subscription', value: 61220 },
        ]}
        format="number"
      />,
    );
    expect(screen.getByText('list_invoices')).toBeInTheDocument();
    expect(screen.getByText('82.1k')).toBeInTheDocument();
  });
});

describe('Blocks', () => {
  it('renders each block kind', () => {
    render(
      <Blocks
        blocks={[
          { kind: 'h2', text: 'Install the CLI' },
          { kind: 'p', text: 'A short paragraph.' },
          { kind: 'code', language: 'bash', code: 'npm install -g mcpfy' },
          { kind: 'list', items: ['first', 'second'] },
          { kind: 'steps', items: ['step one'] },
          { kind: 'note', tone: 'warn', text: 'Be careful here.' },
          { kind: 'table', head: ['Command', 'Does'], rows: [['deploy', 'ships it']] },
        ]}
      />,
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'Install the CLI' });
    expect(heading).toHaveAttribute('id', 'install-the-cli');
    expect(screen.getByText('A short paragraph.')).toBeInTheDocument();
    expect(screen.getByText('npm install -g mcpfy')).toBeInTheDocument();
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('step one')).toBeInTheDocument();
    expect(screen.getByText('Be careful here.')).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(within(table).getByText('deploy')).toBeInTheDocument();
  });
});
